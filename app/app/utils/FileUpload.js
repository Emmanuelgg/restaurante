import React, {Component} from "react"
import ENV from "../config.js"

export function uploadDocumentRequest(file) {
  let data = new FormData();
  data.append('file', file);

  fetch(`${ENV.API_ROUTE}file/upload`, {
      method: "post",
      cors: "cors",
      // headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      // },
      body: data

  })
  .then(response => {return response.json()})
  .then(res => {
      if (res.status != 200)
          return "Error"
  })
}
