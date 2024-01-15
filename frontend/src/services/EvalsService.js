import axios from 'axios';
import apiConfig from './config';

const BASE_URL = `${apiConfig.API_URL}/evals`;

const instance = axios.create();

const EvalsService = {
  /// GET /evals
  all: () => instance.get(BASE_URL),

  /// POST /evals
  /*
    data: {
      "name": "string",
      "forms_link": "string"
      "sheet_link": "string"
    }
  */
  create: (data) => instance.post(BASE_URL, data),

  /// GET /evals/{id}
  get: (id) => instance.get(`${BASE_URL}/${id}`),

  /// PUT /evals/{id}
  /*
    data: {
      "name": "string",
      "forms_link": "string"
      "sheet_link": "string"
    }
  */
  update: (id, data) => instance.put(`${BASE_URL}/${id}`, data),

  /// DELETE /evals/{id}
  delete: (id) => instance.delete(`${BASE_URL}/${id}`),

  /// POST /evals/{id}/assign
  /*
    data: {
      "class_id": "integer",
    }
  */
  assign: (id, data) => instance.post(`${BASE_URL}/${id}/assign`, data),

  assigned: (class_id, cm_id) =>
    instance.get(`${BASE_URL}/assigned/${class_id}/classmember/${cm_id}`),
  submit_eval: (class_pe_id, cm_id) =>
    instance.post(`${BASE_URL}/assigned/${class_pe_id}/classmember/${cm_id}/submit`),
};

export default EvalsService;
