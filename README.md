# TODO
- VALIDATE JWT token
- hook up initial state

# Agenda

- Demo & Background
    - Made emve ~6 years ago
    - Remade it ~4 years ago
    - Made it again ~2.5 weeks ago
- Dev opps 
    - Onboarding - git pull, docker-compose up and your good to go
    - Deployment, using GitLab CI / CD and custom tooling
- Stack 
    - Universal
        - Typescript
            - Type gen from GraphQL                  
    - Frontend
        - NextJS  
            - SSR
        - Authentication
            - Google Login, JWT stored in Cookie
            - Redirs based on cookie, a value of SSR
            - JWT token send in header to API requests
            - Cookie handling library (link) 
        - React 
        - Apollo 
            - Splits API transport into websockets and HTTP requests
            - For subscriptions, did not like their suggested implementation so used lower level workaround
        - UX
            - Kept flows a simple as possible
            - Empty states 
            - Streamline creating a party to one click
            - Remote, dead simple, default to showing your parties status or a very familiar search bar to find a song
        - Code origination
            - React / Apollo let you use components for everything
                - Positive, use familiar constructs 
                - Negative, can lead to unwieldy components
                    - Mitigated by making two classes of components based on responsibility 
                        - View components, responsible for UI only
                        - Controller components, responsible for data operations                           
    - Backend 
        - gapi-to-graphql (Link to Library)           
        - Postgres
            - Knex for query building   
                - No ORM
                - No GraphQL / DB in one, ex: graph.cool
            - Migra - diffing for migrations 
        - Apollo Server
    - Dev opps
        - Docker Compose for local development
        - GitLab CI / CD for deployment to App Engine 
            - Uses custom utilities to aid deployment (link to NPM libraries)
    - Security
        - Access to channels are inherently insecure to prioritize convenience, the following precautions have been taken to  mitigate this:   
            - Channel IDs are in a custom base 26 encoded alphabet (the alphabet but scrambled) to avoid users being able to guess channel IDs of an ongoing sessions
            - Channels ID start at 26^4 to minimize guessability 
        
 
