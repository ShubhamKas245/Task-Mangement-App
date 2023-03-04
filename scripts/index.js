const state={
    taskList:[],
}

const taskContents=document.querySelector(".tasks_contents");
const taskModal=document.querySelector(".task_modal_body")

const htmlTaskContent=({id,title,description,url,type})=>
      `<div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
          <div class='card shadow-sm task_card'>
            <div class='card-header d-flex gap-2 justify-content-end task_card_header'>
              <button type='button' class='btn btn-outline-info mr-2' name=${id}>
                <i class='fas fa-pencil-alt' name=${id}></i>
               </button>
               <button type='button' class='btn btn-outline-danger mr-2' name=${id} >
               <i class='fa fa-pencil-alt' name=${id}></i>
               </button>
            </div>
            <div class='card-body'>
            ${
                url ? `<img width='100%' src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg'/> ` 
                : `<img width='100%' src='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png' alt='card image cap' class='card-image-top md-3 rounded-lg'/> `
            }
            <h4 class='task_card_title'>${title}</h4>
            <p class='description trim-3-lines text-muted' data-gram_editor='false'>${description} </p>
            <div class='tags text-white d-flex flex-wrap'><span class='badge bg-primary m-1'>${type}</span>  
          </div>
            </div>
             <div class='card-footer'>
             <button type=button class='btn btn-outline-primary float-right' data-bs-toggle='modal' data-bs-target='#showTask'
           id=${id} onclick='openTask.apply(this, arguments)'> Open Task </button>
             </div>
           </div>
        </div>
        `;

const htmlModalContent=({id,title,description,url})=>{
    const date=new Date(parseInt(id));
     return `
             <div id=${id}>
             ${
              url
                ? `
                <img width='100%' src=${url} alt='card image cap' class='img-fluid place__holder__image mb-3' />
              `
                : `
              <img width='100%' src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
              `
            }
            <strong class='text-sm text-muted'>Created on ${date.toDateString()}></strong>
             <h2 class='my-3'>${title} </h2>
             <p class='lead'>${description} </p>
            </div>
            `;
};  
  

const updateLocalStorage=()=>{
  localStorage.setItem("tasks", 
  JSON.Stringify({ tasks:state.taskList,})
  );
};

const loadInitialData=()=>{
  const localStorageCopy=JSON.parse(localStorage.tasks);

  if(localStorageCopy) state.taskList=localStorageCopy.tasks;

  state.taskList.map((cardDate)=>{
    taskContents.insertAdjacentHTML('beforeend',htmlTaskContent(cardDate))
  })
}

const handleSubmit=(e)=>{
   const id=`${Date.now()}`;
   const input={
    url:document.getElementById("imageUrl").value,
    title:document.getElementById("taskTitle").value,
    description:document.getElementById("taskDescription").value,
    type:document.getElementById("tags").value,
   };

   if(input.title == '' || input.description == '' || input.type==''){
    return alert("Please fill all fields")
   }

   taskContents.insertAdjacentHTML(
    'beforeend',htmlTaskContent({
      ...input,id,
    })
   )
   state.taskList.push({...input,id});
   updateLocalStorage();
}

const openTab=(e)=>{
  if(!e) e=window.event;

  const getTask=state.taskList.find(({id})=>id===e.target.id);
  taskModal.innerHTML=htmlModalContent(getTask);
}