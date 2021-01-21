import axios from 'axios'
const baseUrl = '/api/jobs'

const getAll = (mail) =>{
	const request = axios.get(`${baseUrl}/recruiter/${mail}`)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

const deleteObj = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
 	return request.then(response => {console.log('successful deletion')})
}

const dbService = {getAll, create, update, deleteObj}

export default dbService