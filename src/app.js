import { http } from './http';
import { ui } from './ui';

// pega post em DOM Load
document.addEventListener('DOMContentLoaded', getPosts);

// aguarda por adicionar post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// aguarda por apagar post
document.querySelector('#posts').addEventListener('click', deletePost);

// aguarda pelo estado de edição
document.querySelector('#posts').addEventListener('click', enableEdit);

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

// funcao de apagar posts
function deletePost(e){
   e.preventDefault();
   
   console.log(e.target.parentElement.dataset.id);
   //linha abaixo faz propagação de evento
   if (e.target.parentElement.classList.contains('delete')) {
      const id = e.target.parentElement.dataset.id;
      if (confirm('Are you sure about that?')) {
         http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
               ui.showAlert('Post removed', 'alert alert-success');
               getPosts();
            })
            .catch(err => console.log(err));
      }
   }
}

// habilita função de editar
function enableEdit(e){
   e.preventDefault();

   if (e.target.parentElement.classList.contains('edit')) {
      const id = e.target.parentElement.dataset.id;
      const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
      const body = e.target.parentElement.previousElementSibling.textContent;
      
      const data = {
         id,
         title,
         body
      }

      // preenche form com o post selecionado
      ui.fillForm(data);
   }
}