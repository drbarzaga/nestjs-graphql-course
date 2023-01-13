# Session of the  NestJS + GraphQL Udemy Course
Contains the sessions of the Udemy course [NestJS + GraphQL](https://www.udemy.com/course/nest-graphql/) by [Fernando Herrera](https://www.udemy.com/user/550c38655ec11/)


# Table of contents
1. [Section 1 Introduction to NestJs](#section-1-introduction-to-nestjs)
2. [Section 2 Introduction to NestJs with GraphQL](#section-2-introduction-to-nestjs-with-graphql)
3. [Section 3 GraphQL continue with the TODOs Example](#section-3-graphql-continue-with-the-todos-example)
4. [Section 4 Postgres + GraphQL + TypeORM](#section-4-postgres--graphql--typeorm)

## Section-1: Introduction to NestJs.

Understanding basics concepts like, `Controllers`, `Services`, `Modules`, `DTOs`.

## Section-2: Introduction to NestJs with GraphQL.

- Installing GraphQL in NestJS.
    ```
    //using yarn
    $ yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express

    //using npm
    $ npm install @nestjs/graphql @nestjs/apollo graphql apollo-server-express
    ```
- Setup GraphQL in the project.
    ```ts 
       // app.module.ts
        @Module({
            imports: [
                GraphQLModule.forRoot<ApolloDriverConfig>({
                    driver: ApolloDriver,
                    debug: true,
                    playground: true,
                    autoSchemaFile: join(process.cwd(), 'src/schema.gql')
                }),
            ],
        })
    ``` 
- Creating our first module `helloworld`

    ```
    $ npx @nestjs/cli g m helloworld --no-spec
    ```
- Crating first GraphQL resolver `helloworld`.

    ```
    $ npx @nestjs/cli g r helloworld --no-spec
    ```

- Creating the first query, inside the `helloworld.resolver.ts` file, put the code below:
    ```ts
        @Resolver()
        export class HelloworldResolver {
            @Query(() => String)
            helloWorld(): string {
                return 'Hello World';
            }
        }
    ```

- Testing our first query in the `Playground`:

  To test our first query in the GraphQL PlayGround you need open it in your browser on `http://localhost:3000/grapqhl`
  
  <img width="1726" alt="Screen Shot 2023-01-11 at 10 42 39" src="https://user-images.githubusercontent.com/12173976/211824917-653c2d96-418e-4d33-82fe-8e3803ead15f.png">

- Installing Apollo Studio

    ```
    $ yarn add apollo-server-core

    $ npm install apollo-server-core
    ```

- Setup the Apollo Studio and disabling the Playground

    ```ts
    // app.module.ts
    ... // Others imports
    import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
    

    @Module({
        imports: [
            GraphQLModule.forRoot<ApolloDriverConfig>({
                driver: ApolloDriver,
                debug: true,
                playground: false,
                plugins: [
                    ApolloServerPluginLandingPageLocalDefault
                ]
                autoSchemaFile: join(process.cwd(), 'src/schema.gql')
            }),
        ],
    })
    ```
    
- Go to `http://localhost:3000/graphql` to see the Apollo Studio

  <img width="1728" alt="image" src="https://user-images.githubusercontent.com/12173976/211831436-082e5a45-10ac-4127-8388-7ef8aa16e8be.png">






## Section-3: GraphQL continue with the TODOs example.

- Learning more about `Resolvers`, `Entities`, `Services`, `Fragments`, `Validations`, `Filters`, `Aggregation` and `Deprecate Fields`.

- The `todo.service.ts` file contains methods below:
    ```ts
    findAll(): Todo[] // Returns a list of todos

    findOne(id: number): Todo // Return a single todo by id

    createTodo(createTodoInput: CreateTodoInput): Todo // Create a new todo

    updateTodo(updateTodoInput: UpdateTodoInput): Todo // Update a todo

    removeTodo(id: number): boolean // Remove one todo by id
    ```

## Section-4: Postgres + GraphQL + TypeORM

- Connecting to Database using Docker, to do that we need create a file named `docker-compose.yaml` in the root of project

   ```yml
        version: '3'

        services:
            db:
                image: postgres:14.3
                restart: always
                ports:
                - "5435:5432"
                environment:
                POSTGRES_PASSWORD: ${DB_PASSWORD}
                POSTGRES_DB: ${DB_NAME}
                container_name: anylistDB
                volumes:
                - ./postgres:/var/lib/postgresql/data
   ```

- Run the docker container to connect to the database:
   
   ```
   $ docker-compose up -d
   ```

- Setup the environment variables, copy the `.env.example` to `.env` and add the properly env variables there, it should look like this below:

   ```env
   ENV = prod

   #database
   DB_HOST=localhost
   DB_USERNAME=db_username
   DB_PASSWORD=db_password
   DB_NAME=db_name
   DB_PORT=5432

   #mailer
   ...
   ``` 

- Using the module `ConfigModule` to have access to the environment variables in our project, we need install the module using the command below:

   ```
   $ yarn add @nestjs/config

   $ npm install --save @nestjs/config
   ```

   Adding the `ConfigModule` in our `app.module.ts`

   ```ts
      // app.module.ts
      import { ConfigModule } from '@nestjs/config'

      @Module({
        imports: [
            ConfigModule.forRoot(),
            ...
        ],
        ...
      })
   ``` 

- We need install and setup `TypeORM` to work with `Postgres`

    ```
    $ yarn add @nestjs/typeorm typeorm pg

    $ npm install --save @nestjs/typeorm typeorm pg
    ```

- Configure the `TypeOrmModule` inside the `app.module.ts` file using the environment variables defined in the `.env`, we need add the code below into the `imports` section of the `app.module.ts`

    ```ts
       import { TypeOrmModule } from '@nestjs/typeorm'
        
       // app.module.ts
       @Module({
          imports: [
            ConfigModule.forRoot(),
            ...
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10) || 5432,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                synchronize: true,
                autoLoadEntities: true,
            }),
          ]
       })

     
    ```
