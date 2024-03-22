/// <reference path="../pb_data/types.d.ts" />
// routerAdd("GET", "/api/allusers", (c) => {
//   console.log(JSON.stringify(c.json(), null, 2));
//   const result = arrayOf(
//     new DynamicModel({
//       id: "",
//       email: "",
//     })
//   );
//   // Get body data
//   const body = $apis.requestInfo(c).data;
//   const status = body.status;
//   console.log(body, status);
//   $app
//     .dao()
//     .db()
//     .select("users.*")
//     .from("users")
//     .limit(100)
//     .orderBy("created ASC")
//     .all(result);

//   return c.json(200, { value: body });
// });

// routerAdd("GET", "/hello/:name", (c) => {
//   let name = c.json();

//   return c.json(200, { message: "Hello " + name });
// });
