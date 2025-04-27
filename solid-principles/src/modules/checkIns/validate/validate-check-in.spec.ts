import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInMinimumMinutesError } from '../shared/errors/check-in-pass-minimum-minutes'
import { CheckInResourceNotFound } from '../shared/errors/check-in-resource-not-found'
import { inMemoryCheckInsRepository } from '../shared/repositories/in-memory.check-ins.repository'
import { ValidateCheckInService } from './validate-check-in.service'

let checkInsRepository: inMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate Check-in Flow', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)

    vi.useFakeTimers();
  })

  afterEach(() => {
    vi.useRealTimers();
  })

  it('should allow validate check in', async () => {

    vi.setSystemTime(new Date(2025,0,20,8,0,0))
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not allow to validate an inexistent check-in', async () => {

    await expect(() =>
      sut.execute({
        checkInId: 'non-check-in-id',
      }),
    ).rejects.toBeInstanceOf(CheckInResourceNotFound)
  })

  it('should not allow to validate check in after 20 min this created', async () => {
    vi.setSystemTime(new Date(2023,0,0,1,13,40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const tweentyOneMinutesInMS = 1000 * 60 * 21; 
    vi.advanceTimersByTime(tweentyOneMinutesInMS);
    console.log("createdCheckIn:::", createdCheckIn.validated_at)
    await expect(() => sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(CheckInMinimumMinutesError)
  })

})