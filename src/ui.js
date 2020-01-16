class Ui {
   constructor(){
      this.post = document.querySelector('#posts');
      this.titleInput = document.querySelector('#title');
      this.bodyInput = document.querySelector('#body');
      this.idInput = document.querySelector('#id');
      this.postSubmit = document.querySelector('.post-submit');
      this.formState = 'add';
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

   //insere conteudo do post no formulario para editar
   fillForm(data){
      this.titleInput.value = data.title;
      this.bodyInput.value = data.body;
      this.idInput.value = data.id;

      this.changeFormState('edit');
   }

   //limpa campo de ID oculto
   clearIdInput(){
      this.idInput.value = '';
   }

   // muda form para estado de edicao
   changeFormState(type){
      if (type === 'edit') {
         this.postSubmit.textContent = 'Update post';
         this.postSubmit.className = 'post-submit btn btn-warning btn-block';

         // cria botao de cacelar
         const button = document.createElement('button');
         button.className = 'post-cancel btn btn-light btn-block';
         button.appendChild(document.createTextNode('Cancel Edit'));
         // pega elemento-pai do botao de cancelar
         const cardForm = document.querySelector('.card-form');
         // pega elemento imediatamente posterior ao botao de cancelar
         const formEnd = document.querySelector('.form-end');
         // insere botao de cancelar
         cardForm.insertBefore(button, formEnd);
      } else {
         // modo ADD
         // altera comportamento do botao
         this.postSubmit.textContent = 'Post It';
         this.postSubmit.className = 'post-submit btn btn-primary btn-block';

         // remove botao de cancelar, se estiver visivel
         if(document.querySelector('.post-cancel')) {
            document.querySelector('.post-cancel').remove();
         }

         // limpa ID no campo de ID oculto
         this.clearIdInput();
         // limpa campos de texto no form
         this.clearFields();
      }
   }
}

export const ui = new Ui();