const rootURL = process.env.NODE_ENV !== "production" ? 
        "http://localhost:4000" : "https://guarded-wildwood-61512.herokuapp.com"

// const rootURL = "http://localhost:4000"
// const rootURL = "https://guarded-wildwood-61512.herokuapp.com"

export const userURL = `${rootURL}/users`
export const imageURL = `${rootURL}/images`