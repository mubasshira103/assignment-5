

let allIssue=[];




const loadIssues = () =>{
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data)
    allIssue=data.data;
    displayIssues(allIssue)

  })

}

const showCard = (id) => {
  if(id == 'btn-all'){
    displayIssues(allIssue);
    setActive(id)


  }
  else if(id == 'btn-open'){
    const openIssues = allIssue.filter(issue => issue.status == "open");

  displayIssues(openIssues);

  setActive(id);
  }

  else{
    const closedIssues = allIssue.filter(issue => issue.status == "closed");

  displayIssues(closedIssues);

  setActive(id);
  }


}



// active button
const setActive = (id) => {

  document.getElementById("btn-all").classList.remove("active-tab");
  document.getElementById("btn-open").classList.remove("active-tab");
  document.getElementById("btn-closed").classList.remove("active-tab");

  document.getElementById(id).classList.add("active-tab");

};


const displayIssues = (issues) => {

  const container = document.getElementById("issue-container");
  const count = document.getElementById("issue-count");

  container.innerHTML = "";

  count.innerText = issues.length + " Issues";
  if (issues.length == 0) {
    container.innerHTML = `<p class="col-span-full text-center">No Issues Found</p>`;
    return;
  }
  issues.forEach(issue => {

    const status = issue.status.toLowerCase();

    let borderColor = "border-t-green-500";
    let iconsColor ='text-green-500';

    if (status === "closed") {
      borderColor = "border-t-purple-500";
      iconsColor='text-purple-500';
    }

    const card = document.createElement("div");

    card.className = `bg-white border border-gray-200 rounded-xl overflow-hidden border-t-4 ${borderColor} p-5 shadow-sm cursor-pointer`;

    card.innerHTML = `

        <div onclick="my_modal_3.showModal()" class="p-1" )
                <div class="flex justify-between items-start mb-4">
                    <div class="${iconsColor}">
                        <i class="fa-solid fa-circle-notch text-lg"></i>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-wider ${getPriorityClass(issue.priority)} px-2 py-1 rounded">${issue.priority}</span>
                </div>
                <h3 class="font-bold text-gray-900 leading-tight mb-2 h-12 overflow-hidden">${issue.title}</h3>
                <p class="text-gray-500 text-xs mb-4 leading-relaxed line-clamp-2">${issue.description.slice(0, 80)}...</p>
                <div class="flex justify-between items-center mb-2">
    ${issue.labels?.map(l => `
        <span class="bg-blue-50 text-blue-500 text-[8px] font-bold px-3 py-1 rounded-full border border-blue-100">
            ${l.toUpperCase()}
        </span>
    `).join('') || '<span class="text-gray-400 text-[10px]">No Labels</span>'}
</div>
                <hr class="border-gray-300 mb-2">
                <div class="text-gray-400 text-[10px] space-y-1">
                    <p>#${issue.id} by ${issue.author}</p>
                    <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;

    container.appendChild(card);

  });

};

function getPriorityClass(p) {
    const priority = p.toLowerCase();
    if (priority === 'high') return 'bg-red-50 text-red-500';
    if (priority === 'medium') return 'bg-yellow-50 text-yellow-500';
    return 'bg-blue-50 text-blue-500';
}

loadIssues();

document.getElementById('search-btn').addEventListener("click", () => {
  const input = document.getElementById("search-input");
  const searchValue = input.value.trim().toLowerCase();
  if (searchValue === "") {
    displayIssues(allIssue);
    return;
  }
const filterIssue = allIssue.filter((i) => {
    return i.title.toLowerCase().includes(searchValue);
  });

  displayIssues(filterIssue);
});

