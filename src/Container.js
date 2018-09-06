import React, { Component } from 'react';
import App from './App';

const projects = [<App name="test" />];

let AppHeader = (props) => {

	return (
		<header>
			<h1>My Todo Manager</h1>
		</header>
	);
}

let ProjectList = (props) => {
  const project_list = props.projects.map((project, key) => {
    return (
    	<div className="display" key={getUniqueId()}>
      	<button onClick={() => props.delete(project)}>Delete</button>
    		{project}
    	</div>
    );
  });

	return (
		<div>{project_list}</div>
	);
}

let ProjectAddForm = (props) => {
	return (
		<form onSubmit={props.insertProject}>
			<input type="text" value={props.item} onChange={props.updateItem}/>
			<input type="submit" value="create" />
		</form>
	);
}

function getUniqueId() {
  return new Date().getTime().toString(36) + '-' + Math.random().toString(36);
}


class Container extends Component {
  constructor() {
    super();
    this.state = {
    	projects: projects,
    	item: ''
    };

    this.insertProject = this.insertProject.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  insertProject(e){
  	e.preventDefault();

  	if (this.state.item.trim() === '') {
  		return
  	}

  	const project = <App key={getUniqueId()} name={this.state.item}/>;

    const projects = this.state.projects.slice();  	
    projects.push(project);
    this.setState({
      projects: projects,
      item: ''
    });
  }

  updateItem(e) {
    this.setState({
      item: e.target.value
    });
  }

  deleteProject(project) {
  	const projects = this.state.projects.slice();
    const pos = this.state.projects.indexOf(project);

    projects.splice(pos, 1);
    this.setState({
      projects: projects
    });
  }

  render() {
    return (
      <div className="container">
      	<AppHeader 
      		projects={this.state.projects}
      	/>

      	<ProjectAddForm
      		item={this.state.item}
      		updateItem={this.updateItem}
      		insertProject={this.insertProject}
      	/>

      	<ProjectList
      		projects={this.state.projects}
      		delete={this.deleteProject}
      	/>

      </div>
    );
  }
}

export default Container;