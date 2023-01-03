# Music Albums API - A Node.js/Express Project

### A simple but solid RESTful API build with TDD approach, following Git commit conventions, and writing clear and readable API documentation. Be a good pragmatic programmar.:v:
You can take a look at the API documentation with this [DEMO](https://actuallyyun.github.io/node-albums-api/).

###  Version 1.0.0 is on its way.

### Endpoints
Our API is organized around REST and exposes a number of endpoints for retrieving and manipulating data. You can find a list of all available endpoints in the [API documentation](https://actuallyyun.github.io/node-albums-api/).

### Response Format
API responses are returned in JSON format. Successful responses include a data field containing the requested data, as well as a status field with a value of success.

Errors are returned with a status field with a value of error, and an error field containing details about the error.

### Example
Here is an example of a request to retrieve a specific album:

```
GET /albums/1
 {
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "artist": "Pink Floyd",
    "url": "https://via.placeholder.com/600/92c952"
}
```

### Acknowledgements

API documentation templates was created by @Florian Nicolas.

README file is written with the help of ChatGTP. 

This project was inspired by the [MigraCode syllabus Node Module](https://syllabus.migracode.org/courses/introduction-3/course-content/nodejs/week-2).

Thanks to Carlos for reviewing my code and providing invaluable advice. 

