const { Router } = require("express");
const router = Router();
const fs = require("fs");

const json_odsl = fs.readFileSync("src/ods.json", "utf-8");
let Aods = JSON.parse(json_odsl);

router.get("/", (req, res) => {
  //res.send('Hola Roxana');
  res.render("index.ejs", {
    Aods
  });
});

router.get("/new-entry", (req, res) => {
  res.render("new-entry");
});

router.post("/editar", (req, res) => {
  console.log(req.body);
  //res.send('Recibido');
  const { id_ods, Titulo, image } = req.body;

  Aods = Aods.filter(ods => ods.id_ods != req.id_ods);

  if (!id_ods || !Titulo) {
    res.status(400).send("Error al Grabar");
    return;
  }
  let newOds = {
    id_ods,
    Titulo,
    image
  };
  Aods.push(newOds);

  const json_ods = JSON.stringify(Aods);
  fs.writeFileSync("src/ods.json", json_ods, "utf-8");
  res.redirect("/");
});

router.get("/editar/:id", (req, res) => {
  Aods = Aods.filter(ods => ods.id_ods === req.params.id);
  res.render(
    "editar",
    {
      Aods
    },
    id
  );
});

router.post("/new-entry", (req, res) => {
  console.log(req.body);
  //res.send('Recibido');

  const { id_ods, Titulo, image } = req.body;
  if (!id_ods || !Titulo) {
    res.status(400).send("Ingrese el Titulo de la ODS");
    return;
  }

  let newOds = {
    id_ods,
    Titulo,
    image
  };
  Aods.push(newOds);

  const json_ods = JSON.stringify(Aods);
  fs.writeFileSync("src/ods.json", json_ods, "utf-8");
  res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
  Aods = Aods.filter(ods => ods.id_ods != req.params.id);
  const json_ods = JSON.stringify(Aods);
  fs.writeFileSync("src/ods.json", json_ods, "utf-8");
  res.redirect("/");
});
module.exports = router;
