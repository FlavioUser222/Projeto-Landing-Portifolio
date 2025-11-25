NODE_TLS_REJECT_UNAUTHORIZED='0'


require('dotenv').config()
const axios = require('axios')
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors({
    origin: "*"
}))

app.get('/projetos', async (req, res) => {

        let response = await axios.get('https://api.github.com/users/FlavioUser222/repos', {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json"
            }
        })

        const repos = response.data.map(repo => ({
            nome: repo.name,
            url: repo.html_url,
            descricao: repo.description
        }))

        res.json(repos)


})




app.listen(3000, () => {
    console.log("servidor rodando")
})