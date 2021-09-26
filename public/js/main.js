  const submitbtn = document.getElementById
('submitbtn');
   const cityname= document.getElementById('cityname');
   const citydata= document.getElementById('city_data');
   const temp=document.getElementById('temp_real');
   const tempstatus=document.getElementById('temp_status');
   const day=document.getElementById('day');
   const date=document.getElementById('date');
   const datahide=  document.querySelector('.middle_layer');
  const getinfo= async(event)=>{
      event.preventDefault();
      let cityval=cityname.value;
      
      if(cityval===""){
          citydata.innerText='Please Write the cityname before search';
          datahide.classList.add('data_hide');
       
    }
    else{
        try
        {
         const day =()=>{
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            let curtime =new Date();
            return weekday[curtime.getDay()];
        };
        const months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct", "Nov", "Dec"
      ];
      let curtime= new Date();
      let month=months[curtime.getMonth()];
      let date=curtime.getDate();
        datahide.classList.remove('data_hide');
         let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=bce94e1762182a5a28c5ed1b1aa7cd31`

        const response= await fetch(url);
        const data= await response.json();
        const arrdata = [data];
        let tempincel = arrdata[0].main.temp-273.15;
        tempincel=tempincel.toFixed(2);
        temp.innerText=tempincel;
        day.innerText=day();
        date.innerText=date;
        citydata.innerText=`${arrdata[0].name},${arrdata[0].sys.country}`;
        

        const tempmood=arrdata[0].weather[0].main;

        if(tempmood=='Sunny'){
           tempstatus.innerHTML=`<i class="fas fa-sun" style="color:#eccc68"></i>`
        }
        else if(tempmood=='Clouds'){
           tempstatus.innerHTML=`<i class="fas fa-cloud" style="color:#f1f2f6"></i>`
        }
        else if(tempmood=='Rainy'){  
           tempstatus.innerHTML=`<i class="fas fa-cloud-rain" style="color:#a4b0b3"></i>`
        }
        else{
           tempstatus.innerHTML=`<i class="fas fa-cloud" style="color:#44c3de"></i>`
        }

    }catch{
        citydata.innerText='Please Write cityname properly';
        datahide.classList.add('data_hide');
    }


      }

  }
  submitbtn.addEventListener('click', getinfo);