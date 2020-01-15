import { http } from './http';
import { ui } from './ui';

// pega post em DOM Load
document.addEventListener('DOMContentLoaded', getPosts);

// aguarda por adicionar post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// retorna posts
function getPosts(){
   http.get('http://localhost:3000/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));
}

// adiciona e edita posts
function submitPost(){
   const title = document.querySelector('#title').value;
   const body = document.querySelector('#body').value;

   const data = {
      title, // em ES6, esta linha equivale a title:title
      body // em ES6, esta linha equivale a body:body
   }

   // cria post
   http.post('http://localhost:3000/posts', data)
      .then(data => {
         // confirma envio do post
         ui.showAlert('Post added', 'alert alert-success');
         // limpa campos do formulario
         ui.clearFields();

         // retorna na interface todos os posts, inclusive o que acabamos de adicionar
         getPosts();
      })
      .catch(err => console.log(err));
}