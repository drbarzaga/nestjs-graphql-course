## Sessions of the NestJS + GraphQL
Contains the sessions of the Udemy course [NestJS + GraphQL](https://www.udemy.com/course/nest-graphql/) by [Fernando Herrera](https://www.udemy.com/user/550c38655ec11/)


# Table of contents
1. [Section 1](#Section-1)
2. [Section 2](#Section-2)

# Section-1
Introduction to NestJs, understanding basics concepts like, `Controllers`, `Services`, `Modules`, `DTOs`.

# Section-2
Introduction to NestJs with GraphQL

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