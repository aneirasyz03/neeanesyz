document.addEventListener("DOMContentLoaded",()=>{
  const loader=document.getElementById("loader");
  setTimeout(()=>loader.classList.add("hide"),900);

  const menu=document.getElementById("menuButton");
  const nav=document.getElementById("navLinks");
  menu.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    menu.setAttribute("aria-expanded",open);
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");reveal.unobserve(e.target)}})
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>reveal.observe(el));

  document.getElementById("year").textContent=new Date().getFullYear();

  const songs=[
    ["drop dead","Olivia Rodrigo","assets/music/track-1.mp3"],
    ["teenage dream","Olivia Rodrigo","assets/music/track-2.mp3"],
    ["Espresso","Sabrina Carpenter","assets/music/track-3.mp3"],
    ["From The Start","Laufey","assets/music/track-4.mp3"],
    ["Glue Song","beabadoobee","assets/music/track-5.mp3"],
    ["Risk","Gracie Abrams","assets/music/track-6.mp3"],
    ["Every Summertime","NIKI","assets/music/track-7.mp3"],
    ["Paper Rings","Taylor Swift","assets/music/track-8.mp3"],
    ["Sofia","Clairo","assets/music/track-9.mp3"],
    ["Pink Pony Club","Chappell Roan","assets/music/track-10.mp3"]
  ];
  const playlist=document.getElementById("playlist"), audio=document.getElementById("audio");
  const title=document.getElementById("songTitle"), artist=document.getElementById("songArtist");
  const play=document.getElementById("playBtn"), progress=document.getElementById("progressBar");
  const current=document.getElementById("currentTime"), duration=document.getElementById("duration");
  let index=0;
  function fmt(sec){if(!isFinite(sec))return"0:00";return Math.floor(sec/60)+":"+String(Math.floor(sec%60)).padStart(2,"0")}
  function render(){
    playlist.innerHTML=songs.map((s,i)=>`<button class="track ${i===index?"active":""}" data-i="${i}"><span class="track-number">${String(i+1).padStart(2,"0")}</span><span><strong>${s[0]}</strong><small>${s[1]}</small></span><b>♡</b></button>`).join("");
    playlist.querySelectorAll(".track").forEach(b=>b.onclick=()=>load(Number(b.dataset.i),true));
  }
  function load(i,autoplay=false){
    index=(i+songs.length)%songs.length;
    title.textContent=songs[index][0]; artist.textContent=songs[index][1];
    audio.src=songs[index][2]; progress.value=0; current.textContent="0:00"; duration.textContent="0:00"; render();
    if(autoplay) audio.play().then(()=>play.textContent="❚❚").catch(()=>play.textContent="▶");
  }
  play.onclick=()=>{if(audio.paused){audio.play().then(()=>play.textContent="❚❚").catch(()=>{})}else{audio.pause();play.textContent="▶"}};
  document.getElementById("prevBtn").onclick=()=>load(index-1,true);
  document.getElementById("nextBtn").onclick=()=>load(index+1,true);
  audio.addEventListener("loadedmetadata",()=>duration.textContent=fmt(audio.duration));
  audio.addEventListener("timeupdate",()=>{if(audio.duration){progress.value=audio.currentTime/audio.duration*100;current.textContent=fmt(audio.currentTime)}});
  progress.oninput=()=>{if(audio.duration)audio.currentTime=progress.value/100*audio.duration};
  audio.addEventListener("play",()=>play.textContent="❚❚");
  audio.addEventListener("pause",()=>play.textContent="▶");
  audio.addEventListener("ended",()=>load(index+1,true));
  load(0);

  const sections=document.querySelectorAll("main section[id]");
  const links=document.querySelectorAll(".nav-links a");
  const activeObs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting)links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+e.target.id))
  }),{rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(s=>activeObs.observe(s));
});