# TODO
- VALIDATE JWT token
- hook up initial state
- when listing tracks join now playing status
- have server determine now playing 
- server can also determine up next 

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
    - Backend 
        - gapi-to-graphql (Link to Library)           
        - Postgres
        - Apollo Server
        - Did not use
            - ORM
            - GraphQL / DB in one, ex: graph.cool 
    - Dev opps
        - Docker Compose for local development
        - GitLab CI / CD for deployment to App Engine 
            - Uses custom utilities to aid deployment (link to NPM libraries)



