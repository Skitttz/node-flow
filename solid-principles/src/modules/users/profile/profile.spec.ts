import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserResourceNotFound } from '../shared/errors/user-resource-not-found'
import { inMemoryUsersRepository } from '../shared/repositories/in-memory.user.repository'
import { ProfileUserService } from './profile.service'

let usersRepository: inMemoryUsersRepository
let sut: ProfileUserService

describe('Profile User Flow', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    sut = new ProfileUserService(usersRepository)
  })

  it('should allow an authenticated user to access their profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Example Name',
      email: 'example@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Example Name')
  })

  it('should prevent access to user profile using an wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(UserResourceNotFound)
  })
})