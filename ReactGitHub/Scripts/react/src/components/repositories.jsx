class Repositories extends React.Component {

    state = {
        items: [],
        bookmarked: [],
        keywords: ""
    }

    //get from the api all the bookmarks saved in session
    componentDidMount = () => {

        $.ajax({
            method: "GET",
            url: "/Api/Bookmark",
            success: (bookmarks) => {
                bookmarks = !bookmarks ? [] : bookmarks;
                const items = bookmarks.map(bookmark => {
                    return bookmark.Id
                });

                this.setState({ bookmarked: items });
            }
        })
    }

    //updated keyword on input change for submit
    handleChange = (e) => {
        const { currentTarget } = e;
        this.setState({ keywords: currentTarget.value });
    }

    // add/remove bookmark from the session
    handleBookmark = (item) => {
        const items = [...this.state.items];
        const index = items.indexOf(item);
        items[index] = { ...items[index] };
        items[index].bookmarked = !items[index].bookmarked;

        if (items[index].bookmarked)
            this.AddBookmark(item)
        else
            this.DeleteBookmark(item)

        this.setState({ items });
    }

    AddBookmark(item) {
        const data = { id: item.id, name: item.name, avatarUrl: item.owner.avatar_url, }

        $.ajax({
            method: "POST",
            url: "/api/bookmark",
            data: data,
        })
    }

    DeleteBookmark(item) {
        $.ajax({
            method: "DELETE",
            url: "/api/bookmark/" + item.id,
        })
    }

    // fetch data from github api and update the state & update already bookmarked items
    handleSubmit = (e) => {
        e.preventDefault();

        $.ajax({
            method: "GET",
            url: "https://api.github.com/search/repositories",
            data: { q: this.state.keywords },
            success: (data) => {

                for (var i = 0; i < this.state.bookmarked.length; i++) {
                    var found = data.items.find(x => x.id == this.state.bookmarked[i]);
                    if (found)
                        found.bookmarked = true;
                }

                this.setState({ items: data.items });
            }
        });
    }

    render() {
        return (
            <div>
                <RepositoriesForm onSubmit={this.handleSubmit} onChange={this.handleChange} />
                <hr />
                <RepositoriesView items={this.state.items} onBookmark={this.handleBookmark} />
            </div>
        );
    }
}