/**
 * Arquivo responsavel por criar a conexao com a API
 */
import axios from 'axios'

export default api = axios.create({
	baseURL: 'http://10.0.2.2:3000'
})