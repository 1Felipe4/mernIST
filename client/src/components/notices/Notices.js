import Notice from './Notice.js';

const Notices = ({ notices, user, title="Notices" }) => {
    
    return (
        <>
        <h2> {title} </h2>
            {notices.map((notice) => (
                <div key={notice._id}>
                    <Notice notice={notice} user={user} />
                </div>
            ))}
        </>
    )
}

export default Notices
