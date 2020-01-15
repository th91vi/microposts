class Ui {
   constructor(){
      this.post = document.querySelector('#posts');
      this.titleInput = document.querySelector('#title');
      this.bodyInput = document.querySelector('#body');
      this.idInput = document.querySelector('#id');
      this.postSubmit = document.querySelector('.post-submit');
      this.forState = document.querySelector('add');
   }

   // carrega posts
   showPosts(posts){
      let output = '';

      posts.forEach((post) => {
         output += `
         <div class="card mb-3">
            <div class="card-body">
               <h4 class="card-title">${post.title}</h4>
               <p class="card-text">${post.body}</p>
               <a href="#" class="edit card-link" data-id="${post.id}">
                  <i class="fa fa-edit"></i>
               </a>
               <a href="#" class="delete card-link" data-id="${post.id}">
                  <i class="fa fa-trash-alt"></i>
               </a>
            </div>
         </div>
         `
      });

      this.post.innerHTML = output;
   }

   // exibe alerta ao criar, editar ou excluir post
   showAlert(message, className){
      this.clearAlert();

      // cria div de alerta
      const div = document.createElement('div');
      // adiciona classes
      div.className = className;
      // adiciona texto da mensagem
      div.appendChild(document.createTextNode(message));
      // pega elemento-pai
      const container = document.querySelector('.postsContainer');
      // retorna posts 
      const posts = document.querySelector('#posts');
      // insere div de alerta
      container.insertBefore(div, posts);

      // contagem regressiva
      setTimeout(() => {
         this.clearAlert();
      }, 3000);
   }

   // limpa alerta
   clearAlert(){
      const currentAlert = document.querySelector('.alert');

      // se existir um alerta, o remova
      if (currentAlert) {
         currentAlert.remove();
      }
   }

   // limpa campos do formulario
   clearFields(){
      this.titleInput.value = '';
      this.bodyInput.value = '';
   }

   fillForm(data){
      this.titleInput.value = data.title;
      this.bodyInput.value = data.body;
      this.idInput.value = data.id;
   }
}

export const ui = new Ui();