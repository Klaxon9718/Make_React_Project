function Header(props) {
	console.log(props)
	return (
	  <div>
		<header>
		  <h3><a href='/' onClick={(event) => {
			event.preventDefault();
			props.onChangeMode();
		  }}>{props.title}</a></h3>
		</header>
	  </div>
	)
  }
  // console.log()는 F12 Console에서 확인 가능하다
  /* 
1. event.preventDefault(); => <a> 태그는 클릭하면 일반적으로 새로운 페이지로 이동하는데, 이것이 "기본 동작".하지만 
  								event.preventDefault()를 호출하면 이러한 기본 동작이 중단되고, 대신에 JavaScript 코드에서 정의한 동작이 실행
2.
  */
  function Nav(props) {
	console.log(props)
	const lis = [];
	for (let i = 0; i < props.topics.length; i++) {
	  let t = props.topics[i];
	  lis.push(<li key={t.id}><a id={t.id} href={`/read/${t.id}`} onClick={event => {
		event.preventDefault();
		props.onChangeMode(event.target.id);
	  }}>{t.title}</a></li>)
	}
	return (
	  <nav>
		<ul>
		  {lis}
		</ul>
	  </nav>
	)
  }
  
  function Article({title, body}) {
	return (
	  <article>
		<h6>{title}</h6>
		{body}
	  </article>
	)
  }
  
  function App() {
	const topics = [
	  {id:1, title: 'html', body: 'html is...'},
	  {id:2, title: 'css', body: 'css is...'},
	  {id:3, title: 'js', body: 'js is...'},
	]
	return (
	
	  <div className="App">
		<Header title="REACT" onChangeMode={() => alert('Header')} />
		<Nav topics={topics} onChangeMode={(id) => alert(id)} />
		<Article title="Welcome" body="Hello, Web" />
	  </div>
	);
  }
  
  export default App;