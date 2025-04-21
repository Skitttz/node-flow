## 📌 Overview

NodeFlow is a structured roadmap for learning Node.js fundamentals, REST API development, SOLID principles, Domain-Driven Design (DDD), and best practices modules from [Rocketseat](https://www.rocketseat.com.br/) and adjusted by Skittz

## 📍 Study Roadmap

### 🏕️ **Phase 1**: Node.js Fundamentals

Start with the foundation: Understand the core concepts of Node.js, including the event loop, asynchronous programming, and working with modules. This is where you set up your gear for the climb ahead!

### ⛰️ **Phase 2**: Building a REST API

Build a complete REST API using modern tools and best practices. Implement [TypeScript](https://www.typescriptlang.org/) for type safety, [Fastify](https://fastify.dev/) for high-performance routing, and [Knex](https://knexjs.org/) for database operations. This phase focuses on practical application development with current industry standards.

- #### Functional Requirements (RF)

| ID   | Description                                      | Status |
| ---- | ------------------------------------------------ | ------ |
| FR01 | User must be able to create a new transaction    | ✅     |
| FR02 | User must be able to get an account summary      | ✅     |
| FR03 | User must be able to list all transactions       | ✅     |
| FR04 | User must be able to view a specific transaction | ✅     |

- #### Non-Functional Requirement (NFR)

| ID    | Description                                | Status |
| ----- | ------------------------------------------ | ------ |
| NFR01 | User must be identifiable between requests | ✅     |

- #### Business Rules (BR)

| ID   | Description                                                                        | Status |
| ---- | ---------------------------------------------------------------------------------- | ------ |
| BR01 | Transaction can be either credit (adds to amount) or debit (subtracts from amount) | ✅     |
| BR02 | User can only view transactions they created                                       | ✅     |

</br>

### 🌄 **Phase 3**: SOLID Principles

Build a complete gym check-in 🏋🏽 system while learning SOLID principles and design patterns. Implement authentication with [JWT](https://pt.wikipedia.org/wiki/JSON_Web_Token) and [Refresh Tokens](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/), Role-Based Access Control [(RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control), and database management with [Docker](https://www.docker.com/). This phase combines architectural concepts with practical application.

- #### Functional Requirements (RF)

| ID   | Description                                          | Status |
| ---- | ---------------------------------------------------- | ------ |
| FR01 | Users must be able to sign up                        | ✅     |
| FR02 | Users must be able to authenticate                   | ✅     |
| FR03 | Users must be able to get their profile information  | 🚧     |
| FR04 | Users must be able to get their total check-in count | 🚧     |
| FR05 | Users must be able to view their check-in history    | 🚧     |
| FR06 | Users must be able to search for nearby gyms         | 🚧     |
| FR07 | Users must be able to search for gyms by name        | 🚧     |
| FR08 | Users must be able to check in at a gym              | 🚧     |
| FR09 | Staff must be able to validate user check-ins        | 🚧     |
| FR10 | Staff must be able to register new gyms              | 🚧     |

- #### Non-Functional Requirements (NFR)

| ID    | Description                                             | Status |
| ----- | ------------------------------------------------------- | ------ |
| NFR01 | User passwords must be encrypted                        | ✅     |
| NFR02 | Application data must be persisted in PostgreSQL        | 🚧     |
| NFR03 | All data lists must be paginated with 20 items per page | 🚧     |
| NFR04 | Users must be identified using JWT                      | 🚧     |

- #### Business Rules (BR)

| ID   | Description                                                   | Status |
| ---- | ------------------------------------------------------------- | ------ |
| BR01 | Users cannot register with a duplicate email                  | ✅     |
| BR02 | Users cannot perform more than one check-in per day           | 🚧     |
| BR03 | Users can only check in when within range (100m) of the gym   | 🚧     |
| BR04 | Check-ins can only be validated within 20 minutes of creation | 🚧     |
| BR05 | Check-ins can only be validated by administrators             | 🚧     |
| BR06 | Gyms can only be registered by administrators                 | 🚧     |

### 🏗️ **Phase 4**: Domain-Driven Design (DDD)

Develop a forum API while mastering DDD and Clean Architecture principles. Learn to design domain models, create value objects and relationships, implement use cases with functional error handling, and apply concepts like subdomains and domain events. All backed by unit testing to ensure code reliability.
