### API

This api is used for most of the data fetching and mutating, though in some places actions are favoured. However where this API is used it mostly follows a REST sort of structure.

I have implmented a usePOST hook that is my own implementation of useSWRMutation, or at least how I would have liked it to work. Because of this, POST requests on this API need to follow a certain structure in their responses.

#### Error responses

Should make use of status codes appropriately, no returning error messages on 200's. Do this by using the second parameter of the `NextResponse.json()` method:

```
return NextResponse.json({
  error: "Incorrect username or password"
}, {
  status: 400
})
```

#### Successful responses

For POST requests they can return the object they are returning or just a 200 with nothing in the body if not needed, like logging in.

#### Unauthenticated

For unauthenticated responses, checked using the `auth()` method (described below) you can return the `UnauthdResponse` prebuilt response (from `@/lib/responses`)

### Authentication

For any kind of authentication on the API side, the `auth()` function should be called and checked if it returns any session. Something like this:

```
const session = await auth()
if (!session) return UnauthdResponse
```

Calling this method also runs a check to see if the session needs refreshing and refreshes if so.
