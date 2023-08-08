import axios from "axios";

const baseUrl = "api/persons";

const getData = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const saveData = (object) => {
  return axios.post(baseUrl, object).then((response) => response.data);
};

const deleteData = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const putData = (id, object) => {
  return axios
    .put(`${baseUrl}/${id}`, object)
    .then((response) => response.data);
};

const dataService = {
  getData: getData,
  saveData: saveData,
  deleteData: deleteData,
  putData: putData,
};

export default dataService;
