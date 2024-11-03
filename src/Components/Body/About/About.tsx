// import React from "react";

// class About extends React.Component {
//     // pass the props same as functional components like this 
//     // constructor({name}){ 
//     //     super({name});
//     // }
//     constructor(props){ 
//         super(props);

//         this.state = {
//             // count : 0,
//             // items: [1, 2, 3],
//             userData: {},
//         }
//     }

//    async componentDidMount() {
//         console.log('mounted');
//         const response = await fetch('https://api.github.com/users/Sravya');
//         const data = await response.json();
//         this.setState({userData: data});
//         console.log(data, 'data');

//       this.timer =   setInterval(()=> { // when settinging something like intervals or listeners 
//             console.log('setinterveal')
//         }, 1000)
//     }

   
//     componentDidUpdate(): void {
//         console.log('updated');
//     }
//     componentWillUnmount(): void {
//         console.log('un-mounted');
//         clearInterval(this.timer); // when settinging something like intervals or listeners we need to remove them also which optimize the application
//     }

//     handleclick() {
//         this.setState({count: this.state.count + 1});
//     }

//     render(){
//         const {name, number} = this.props;
//         const {count, items} = this.state;
//         return (
//             <div>
//                 {/* <h1>Count: {count}</h1>
//                 <button onClick={()=> {
//                     this.handleclick()
//                 }}>Count Increase</button>
//                 <h2> {items}</h2>
//                 About this {name} {number} */}
//                 Name: {this.state.userData.login}
//             </div>
//         )
//     }
   
// }

// export default About;