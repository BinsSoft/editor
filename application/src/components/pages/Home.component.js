import React from 'react';
class Home extends React.Component {
    
    handelClickTonav = ()=>{
        let snippetNumber = new Date().getTime();
        let name = Math.random().toString(24).replace('0.', '') 
        let obj = {
            slug: snippetNumber+name,
            name: name
        };
        sessionStorage.setItem('_sc', JSON.stringify(obj));
        this.props.history.push('/editor/'+obj.slug)
        
    }
    render () {
        
        return (
            <div className="home-container">
                <div className="banner-container">
                    <div className="heading">
                    <h2>Code The Future</h2>
                    <div className="sub-heading">Deploy - in just one click</div>
                    </div>
                
                </div>
                <div className="bottom-home-container">
                    <div className="btn-container">
                    <button onClick={this.handelClickTonav} className="btn btn-lg btn-primary">Create Your Own Snippet</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default Home;