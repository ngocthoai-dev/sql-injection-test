function submitSearching(evt) {
	evt.preventDefault();

  let data, type;
  // console.log(getComputedStyle(searchApprox).left, searchApprox.getElementsByTagName('INPUT')[0]);
  if(getComputedStyle(searchApprox).left == "0px"){
    data = searchApprox.getElementsByTagName('INPUT')[0].value;
    type = "approx";
  } else if(getComputedStyle(searchExact).left == "0px"){
    data = searchExact.getElementsByTagName('INPUT')[0].value;
    type = "exact";
  } else if(getComputedStyle(searchRange).left == "0px"){
    data = [searchRange.getElementsByTagName('INPUT')[0].value, searchRange.getElementsByTagName('INPUT')[1].value];
    type = "range";
  }

  // console.log(type, data);

  axios.post('/home', { data: data, type: type })
  .then((resp)=>{
		// console.log(resp.data.err);
    if(resp.data.success){
      document.getElementsByClassName('search-result')[0].innerHTML = resp.data.table;
    }
  })
  .catch((err)=>{
		console.log(err);
  });
}
