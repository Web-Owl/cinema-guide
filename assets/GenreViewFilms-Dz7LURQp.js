import{d as p,u as c,s as g,o as k,a as h,b as s,h as e,t as b,e as o,f as v,M as w,g as B,w as M,B as x,F as y,i as V,l as C,j as i,T as F,m as N,n as T,k as R,_ as S}from"./index-D3KX5E5N.js";const G={class:"top-block-genre-films"},I={class:"container"},P={class:"top-block-genre-films__inner"},j={class:"top-block-genre-films__title"},z={class:"catalog-films-genre-films"},D=p({__name:"GenreViewFilms",setup(E){const{setMovies:l,incrementPage:m,loadMoreMovies:_}=c(),{moviesByParams:t}=g(c()),a=V(),d=C();k(async()=>{await l(a.params.genre)});function u(){d.go(-1)}async function f(){m(),await _(a.params.genre)}return(H,n)=>{var r;return i(),h(y,null,[s(F,{class:"header-genre-films"}),e("section",G,[e("div",I,[e("div",P,[e("button",{class:"top-block-genre-films__link-back",onClick:u},[s(N,{class:"arrow-back-icon",icon:"arrow-back",width:"40px",height:"40px"})]),e("h2",j,b(o(a).params.genre),1)]),e("div",z,[(r=o(t))!=null&&r.length?(i(),v(w,{key:0,cardSize:"small",isNumbered:!1,movies:o(t)},null,8,["movies"])):B("",!0),s(x,{onClick:f,class:"btn-show-more",type:"primary"},{default:M(()=>n[0]||(n[0]=[T("Показать ещё")])),_:1})])])]),s(R)],64)}}}),q=S(D,[["__scopeId","data-v-9f3f5ead"]]);export{q as default};
