/**
 * Arquivo responsavel por criar a conexao com a API
 */
import axios from 'axios'

export default api = axios.create({
	baseURL: 'http://192.168.0.107:3000'
})