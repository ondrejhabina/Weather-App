const e=document.getElementById("temperature-display"),t=document.getElementById("date-display"),r=document.getElementById("city-display"),n=document.querySelector(".main__search__searchbar"),i=document.querySelector(".main__search__submit-button"),s=document.querySelector(".weather-description"),a=document.getElementById("day1"),o=document.getElementById("day2"),c=document.getElementById("day3"),u=document.getElementById("day4"),l=a.querySelector(".tempterature-display-prediction-number"),h=o.querySelector(".tempterature-display-prediction-number"),p=c.querySelector(".tempterature-display-prediction-number"),d=u.querySelector(".tempterature-display-prediction-number"),y=a.querySelector(".prediction-date"),m=o.querySelector(".prediction-date"),_=c.querySelector(".prediction-date"),g=u.querySelector(".prediction-date");setTimeout((()=>{w.style.opacity="0",w.style.display="none",$.getDate(),setTimeout((()=>b.style.opacity="100"),100),setTimeout((()=>f.style.opacity="100"),300),setTimeout((()=>T.style.opacity="100"),500)}),2500);const b=document.querySelector("header"),f=document.querySelector("main"),T=document.querySelector("footer"),w=document.getElementById("loader");document.addEventListener("keyup",(function(e){"Enter"===e.key&&($.getDate(),$.fetchWeather())})),i.addEventListener("click",(function(){$.getDate(),$.fetchWeather()}));const $={_apiKey:"bef1fd4f352d760bcd80a36b1b00d723",_city:"",_userInput:"",_responseJson:{},_currentWeather:"",_currentTemperature:0,_date:"",_icon:"",_weatherDescription:"",get apiKey(){return this._apiKey},get city(){return this._city},get userInput(){return this._userInput},get responseJson(){return this._responseJson},get currentWeather(){return this._currentWeather},get currentTemperature(){return this._currentTemperature},get date(){return this._date},get icon(){return this._icon},get weatherDescription(){return this._weatherDescription},set weatherDescription(e){this._weatherDescription=e},set icon(e){this._icon=e},set date(e){this._date=e},set currentTemperature(e){this._currentTemperature=e},set currentWeather(e){this._currentWeather=e},set responseJson(e){this._responseJson=e},set city(e){this._city=e},fetchWeather(){let e=n.value;this._city=e;let t=e.charAt(0).toLocaleUpperCase()+e.slice(1);r.innerHTML=t;fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this._city}&appid=${this._apiKey}`).then((e=>e.json())).then((e=>this.filterJson(e))).catch((e=>console.log(`Request failed with reason: ${e}`)))},filterJson(t){this._responseJson=t;let r=[],n=[],i=[],a=[],o=[],c=this._date;for(let r=0;r<t.list.length;r++)if(0==r){let r=t.list[0];this.getWeatherDescription(r),s.innerHTML=this._weatherDescription;let n=r.main.temp;this._currentTemperature=Math.floor(n-273.15),this.showTemp(e)}else{let e=[t.list[r].dt_txt,t.list[r].main.temp];o.push(e)}for(let e=0;e<o.length;e++){let t=o[e][0].split(""),s=t[8],u=t[9],l=t[11],h=t[12],p=parseInt(`${s}${u}`),d=parseInt(`${l}${h}`);p==c+1&&d>7&&d<22&&r.push(o[e][1]),p===c+2&&d>7&&d<22&&n.push(o[e][1]),p===c+3&&d>7&&d<22&&i.push(o[e][1]),p===c+4&&d>7&&d<22&&a.push(o[e][1])}this.showTemp(l,(()=>{let e=0;for(let t=0;t<r.length;t++){e+=Math.floor(r[t]-273.15)}return Math.floor(e/(r.length-1))})()),this.showTemp(h,(()=>{let e=0;for(let t=0;t<n.length;t++){e+=n[t]-273.15}return Math.floor(e/(n.length-1))})()),this.showTemp(p,(()=>{let e=0;for(let t=0;t<i.length;t++){e+=i[t]-273.15}return Math.floor(e/(i.length-1))})()),this.showTemp(d,(()=>{let e=0;for(let t=0;t<a.length;t++){e+=a[t]-273.15}return Math.floor(e/(a.length-1))})())},showTemp(e,t){let r="";null==t&&(t<5&&(r="blue"),t<20&&(r="green"),t<30&&(r="yellow"),t>30&&(r="red"));let n=0;if(t)return n=t,void(e.innerText=`${n}`);n=this._currentTemperature,e.innerHTML=`${n}°`},getDate(){let e=new Date,r=e.getDate(),n=e.getMonth()+1,i="",s=e.getFullYear();switch(this._date=r,n){case 1:i="January";break;case 2:i="February";break;case 3:i="March";break;case 4:i="April";break;case 5:i="May";break;case 6:i="June";break;case 7:i="July";break;case 8:i="August";break;case 9:i="September";break;case 10:i="October";break;case 11:i="November";break;case 12:i="December"}t.innerHTML=`${r} ${i} ${s}`,y.innerHTML=`${r+1} ${i}`,m.innerHTML=`${r+2} ${i}`,_.innerHTML=`${r+3} ${i}`,g.innerHTML=`${r+4} ${i}`},getWeatherDescription(e){let t=e.weather[0].description;console.log(t),this._weatherDescription=t}};
//# sourceMappingURL=index.38b1aed4.js.map
