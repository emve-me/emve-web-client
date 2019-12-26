# TODO

- Optimistic ui / update cache from mutations, relying on subscription data for channel sate now
- Play pause / other host controls
- Global style variables
- Pretty errors from gql
- Paging

# Agenda

- Demo & Background
  - Inspired by the Nexus Q (predecessor to Chrome Cast)
  - Made emve ~6 years ago
  - Remade it ~4 years ago
  - Made it again ~2.5 weeks ago (mainly wanted to play around with GraphQL subscriptions)
- Dev opps
  - Docker Compose for local development
  - GitLab CI / CD for deployment to App Engine
    - [Uses custom utilities to aid deployment](https://medium.com/@robizm/gitlab-ci-cd-tooling-for-deploying-app-engine-node-apps-e2f32d5226e3)
  - Note on AppEngine
    - App is cloud agnostic, not using anything like Cloud Firestore, or AppSync that would make it harder port to a different provider
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
      - [Cookie handling library](https://www.npmjs.com/package/vanilla-cookies)
    - React
    - Apollo
      - Splits API transport into websockets and HTTP requests
      - For subscriptions, did not like their suggested implementation so used lower level workaround
    - UX
      - Responsive
      - Kept flows a simple as possible
        - Streamline creating a party to one click
      - Empty states
      - Remote, dead simple, default to showing your parties status or a very familiar search bar to find a song
    - Code organisation
      - React / Apollo let you use components for everything
        - Positive, use familiar constructs
        - Negative, can lead to unwieldy components
          - Mitigated by making two classes of components based on responsibility
            - View components, responsible for UI only
            - Controller components, responsible for data operations
  - Backend
    - [gapi-to-graphql](https://github.com/rlancer/gapi-to-graphql)
    - Postgres
      - Knex for query building
        - No ORM
        - No GraphQL / DB in one, ex: graph.cool
      - Migra - diffing for migrations (have not needed to implement)
    - Apollo Server
  - Security
    - Access to channels are inherently insecure to prioritize convenience, the following precautions have been taken to mitigate this:
      - Channel IDs are in a custom base 26 encoded alphabet (the alphabet but scrambled) to avoid users being able to guess channel IDs of an ongoing sessions
      - Channels ID start at 26^4 to minimize guessability

# Wish list

- Live Queries, would cut down on complexity a lot
- Typescript friendlier database library with typegen from schema, a few systems like that out there

# Roadmap

- Talk to someone at YouTube to see if this is kosher, maybe for YTRed subscribers
- Restore lost player sessions
  - If your player closes and you reender, it should know you have a session going on and ask you to continue it
- Export a playlist of your party to YouTube / Spotifiy
- Playback parties
- Shout box
- Upvoting
- Native apps
