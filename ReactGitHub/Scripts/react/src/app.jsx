class App extends React.Component {

    render() {
        const { Switch, Route, Redirect } = window.ReactRouterDOM;

        return (
            <div>
                <NavBar />
                <div className="container">
                    <Switch>
                        <Route path="/bookmarks" component={Bookmarks} />
                        <Route path="/home" component={Repositories} />
                        <Redirect from="/" exact to="/home" />
                    </Switch>
                </div>
            </div>
        );
    }
}