const http = require('http');
const uuid = require('uuid');
let persons = [
  { id: '05bbe0ee-bbf3-45b7-8b61-205b43c61071', name: 'Антон', age: 10, hobbies: [] },
  { id: '372541c5-0fd8-4992-ba76-a6dca5868abe', name: 'Артем', age: 12, hobbies: ['1', '2', '3'] },
];

const validateCreatePerson = (body) => {
  if (body.name === undefined) {
    return 'Missing required parameter "name" ';
  }

  if (body.age === undefined) {
    return 'Missing required parameter "age" ';
  }

  if (body.hobbies === undefined) {
    return 'Missing required parameter "hobbies" ';
  }

  return '';
};

const findPerson = (id) => {};

const isPersonExists = () => {};

const getReauestData = async (req) => {};

const responseTemplate = (res, code, resData) => {
  res.writeHead(code, { 'Content-type': 'application/json' });
  res.write(resData);
  res.end();
  // return;
};

// try {
// } catch (e) {
//   res.writeHead(500, { 'Content-type': 'application/json' });
//   res.write(JSON.stringify({ error: `Invalid err` }));
//   res.end();
// }

const server = http.createServer((req, res) => {
  const [_, resource, id] = req.url.split('/');
  console.log(resource, id, req.method);
  console.log(resource === 'person');
  console.log(req.url);
  // validate url /person && params >= 2 &&
  // switch (req.url) {
  //   case `/${resource}/${id}`:
  //     break;

  //   default:
  //     break;
  // }

  // GET, POST /person
  // DELETE, PUT, GET /person/{personId}
  // console.log(req.url.split('/'));

  // id valid = > break
  // person valid => break
  //

  if (resource !== 'person' || req.url.split('/') > 3) {
    res.writeHead(404, { 'Content-type': 'application/json' });
    res.write(JSON.stringify({ error: `Invalid path` }));
    res.end();
    return;
  }

  switch (req.method) {
    case 'GET': {
      if (req.url === `/${resource}`) {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.write(JSON.stringify({ payload: { persons } }));
        res.end();
        break;
      }

      if (req.url === `/${resource}/${id}`) {
        if (uuid.validate(id)) {
          const person = persons.find((p) => p.id === id);
          if (person) {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.write(JSON.stringify({ payload: { person } }));
            res.end();
          } else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.write(JSON.stringify({ error: 'Person is not found' }));
            res.end();
          }
          break;
        } else {
          res.writeHead(400, { 'Content-type': 'application/json' });
          res.write(JSON.stringify({ error: 'Id is not valid' }));
          res.end();
          break;
        }
      }
    }

    case 'POST': {
      let body = '';

      req.on('data', (d) => {
        body += d.toString();
      });

      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const validate = validateCreatePerson(data);
          if (validate) {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.write(JSON.stringify({ error: validate }));
            res.end();
          }
          if (!validate) {
            const newPerson = { id: uuid.v4(), ...data };
            persons.push(newPerson);
            res.writeHead(201, { 'Content-type': 'application/json' });
            res.write(JSON.stringify(newPerson));
            res.end();
          }
        } catch (e) {
          console.log(e);
          res.writeHead(400, { 'Content-type': 'application/json' });
          res.write(JSON.stringify({ error: `Invalid user data` }));
          res.end();
        }
      });
      break;
    }

    case 'PUT': {
      if (uuid.validate(id)) {
        let body = '';

        req.on('data', (d) => {
          body += d.toString();
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const person = persons.find((p) => p.id === id);
            if (person) {
              persons = persons.map((p) => {
                if (p.id === id) {
                  return { ...p, ...data };
                }
                return p;
              });
              res.writeHead(200, { 'Content-type': 'application/json' });
              res.write(JSON.stringify({ payload: { person: { ...person, ...data } } }));
              res.end();
            } else {
              res.writeHead(404, { 'Content-type': 'application/json' });
              res.write(JSON.stringify({ error: 'Person is not found' }));
              res.end();
            }
          } catch (e) {
            console.log(e);
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.write(JSON.stringify({ error: `Invalid user data` }));
            res.end();
          }
        });
        break;
      } else {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.write(JSON.stringify({ error: 'Id is not valid' }));
        res.end();
        break;
      }
    }

    case 'DELETE': {
      if (uuid.validate(id)) {
        const person = persons.find((p) => p.id === id);
        if (person) {
          persons = persons.filter((p) => p.id !== id);
          res.writeHead(240, { 'Content-type': 'application/json' });
          res.write(JSON.stringify({ payload: { person } }));
          res.end();
        } else {
          res.writeHead(404, { 'Content-type': 'application/json' });
          res.write(JSON.stringify({ error: 'Person is not found' }));
          res.end();
        }
        break;
      } else {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.write(JSON.stringify({ error: 'Id is not valid' }));
        res.end();
        break;
      }
    }

    default: {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.write(JSON.stringify({ error: `Invalid path ` }));
      res.end();
      break;
    }
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
