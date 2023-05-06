const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs');
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.json());





app.post('/api/formulario', (req, res) => {
  

  
  const formData = req.body // obter os dados enviados pelo React
  console.log('req.body:', req.body);
  fs.readFile('dados.json', 'utf8', (err, jsonString) => { // ler os dados do arquivo JSON
    if (Object.keys(formData).length === 0) {
      console.log("Dados vazios.");
      res.send("Dados vazios."); // enviar resposta de erro para o React
      return;
    }
    if (err) {
      console.log("Erro ao ler arquivo:", err);
      return;
    }
    let dados = JSON.parse(jsonString); // converter o JSON para um objeto JavaScript
    dados.push(formData); // adicionar os novos dados ao array de dados existente
    fs.writeFile('dados.json', JSON.stringify(dados), (err) => { // escrever os novos dados de volta no arquivo JSON
      if (err) {
        console.log("Erro ao gravar arquivo:", err);
        return;
      }

      
      console.log("Dados salvos com sucesso.");
      res.send("Dados salvos com sucesso."); // enviar resposta de sucesso para o React
    });
  });
});


app.get('/api/formulario', (req, res) => {
  fs.readFile('dados.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo JSON');
      return;
    }
    
    const projetos = JSON.parse(data);
    res.json(projetos);
  });
});


app.listen(3000, () => {
  console.log('Server running on port 3000')
})