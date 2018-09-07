class Bookmarks extends React.Component {

    state = {
        items: [],
    }

    //get from the api all the bookmarks saved in session
    componentDidMount = () => {

        $.ajax({
            method: "GET",
            url: "/Api/Bookmark",
            success: (bookmarks) => {
                bookmarks = !bookmarks ? [] : bookmarks;

                const items = bookmarks.map(bookmark => {
                    return {
                        id: bookmark.Id,
                        name: bookmark.Name,
                        owner: {
                            avatar_url: bookmark.AvatarUrl
                        },
                        bookmarked: true
                    }
                });

                this.setState({ items });
            }
        });
    }

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

    render() {

        return (
            <div>
                <RepositoriesView items={this.state.items} onBookmark={this.handleBookmark} />
            </div >
        );
    }
}