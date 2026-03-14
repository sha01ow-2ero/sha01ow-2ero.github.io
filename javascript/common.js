let lastIsMobile=null;
function footer()
{
  const footerLeft=document.getElementById('footer-left');
  const footerRight=document.getElementById('footer-right');
  const footerHTML='<p>© 2024-2026 sha01ow-2ero. All Rights Reserved.<br/>Developed by the <a href="https://github.com/sha01ow-2ero/">sha01ow_2ero</a></p><p>为了保证您的使用体验，建议使用国际网络环境访问</p>';
  let isMobile;
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent)||window.matchMedia('(max-width: 1080px)').matches)//移动端
    isMobile=true;
  else//PC端
    isMobile=false;
  if(isMobile===lastIsMobile)return;
  lastIsMobile=isMobile;
  footerLeft.innerHTML=isMobile?'':footerHTML;
  footerRight.innerHTML=isMobile?footerHTML:'';
}
async function getText(url)
{
  var text=null;
  await fetch(url)
  .then(response=>{
    if(!response.ok)throw new Error(`Load failed. HTTP ${response.status}`);
    return response.text();
  })
  .then(data=>{text=data;})
  .catch(error=>{text=`Text Error: ${error.message}`;});
  return text;
}
async function getJSON(url)
{
  var json=null;
  await fetch(url)
  .then(response=>{
    if(!response.ok)throw new Error(`Load failed. HTTP ${response.status}`);
    return response.text();
  })
  .then(data=>{text=data;})
  .catch(error=>{text=`Text Error: ${error.message}`;});
  return json;
}
//marked渲染
function putmarkdown(selector,text)
{
  document.querySelector(selector).innerHTML=marked.parse(text);//marked（按 css 的 id 和 class 选择器查找）
  hljs.highlightAll();//highlight.js
  if(window.MathJax)MathJax.typesetPromise?.();
}
//随机音频播放器
function random(min,max){return Math.floor(Math.random()*(max-min+1))+min;}//随机数
function randomMusic(url)
{
  let arr=[];
  fetch(url)
  .then(response=>{
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data=>{
    for(let i=0;i<data.audio.length;i++)
      for(let j=0;j<data.audio[i].weight;j++)
        arr.push(data.audio[i].url);
    document.querySelector("#sidebar").innerHTML=`<audio controls loop><source src="${arr[random(0,arr.length-1)]}" type="audio/mp3"></source>您的浏览器不支持 audio 元素</audio>`+document.querySelector("#sidebar").innerHTML;
  })
  .catch(error=>{
    document.querySelector("#sidebar").innerHTML=`<p>MP3 加载失败：${error.message}</p>`+document.querySelector("#sidebar").innerHTML;
  });
}
document.addEventListener('DOMContentLoaded',function(){//等待文档完全加载和解析完成
  let resizeTimer=false;
  window.addEventListener('resize',()=>{
    if(resizeTimer)cancelAnimationFrame(resizeTimer);
    resizeTimer=requestAnimationFrame(footer);
  });
  footer();
  putmarkdown("article","./index.md");
  randomMusic("/audio/cosmic-princess-kaguya/config.json");
});
