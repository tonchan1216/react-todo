import React, { Component } from 'react';
import App from './App';

const projects = [];

let AppHeader = (props) => {
	return (
		<header>
			<h1>My Todo Manager</h1>
		</header>
	);
}

let AppSidebar = (props) => {
  const project_tab = props.projects.map((project, key) => {
	  return (
	  	<li key={key}>
	    	<span onClick={() => props.toggleProject(project)}>{project.props.name}</span>
      	<button onClick={() => props.delete(project)}>×</button>
	  	</li>
	  );
	});

  return (
  	<div  className="sidebar">
    	<ProjectAddForm
    		item={props.item}
    		updateProjectForm={props.updateProjectForm}
    		insertProject={props.insertProject}
    	/>
  		<ul>{project_tab}</ul>
  	</div>
	);
}

let ProjectAddForm = (props) => {
	return (
		<form className="side" onSubmit={props.insertProject}>
			<input type="text" value={props.item} onChange={props.updateProjectForm} placeholder="Create New Project"/>
			<input type="submit" value="+" />
		</form>
	);
}


let ProjectList = (props) => {
  const project_list = props.projects.map((project, key) => {
    return (
    	<div key={getUniqueId()}>
    		{project}
    	</div>
    );
  });

	return (
		<div className="project-container">{project_list}</div>
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
    this.updateProjectForm = this.updateProjectForm.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.toggleProject = this.toggleProject.bind(this);
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

  updateProjectForm(e) {
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

  toggleProject(project) {
  	const projects = this.state.projects.slice();
    const pos = this.state.projects.indexOf(project);

    projects[pos] 
    console.log(projects[pos]);
  }

  render() {
    return (
      <div className="container">
      	<AppHeader />

      	<AppSidebar
      		projects={this.state.projects}
	    		item={this.state.item}
	    		updateProjectForm={this.updateProjectForm}
	    		insertProject={this.insertProject}
      		toggleProject={this.toggleProject}
      		delete={this.deleteProject}
      	/>

      	<ProjectList
      		projects={this.state.projects}
      	/>

      </div>
    );
  }
}

export default Container;