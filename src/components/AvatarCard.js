import React from 'react';
import StartupAvatar from '../images/avatar.jpg';

export default function AvatarCard() {
    return (
        <div className="avatar-card">
            <img
                src={StartupAvatar}
                alt="An avatar that shows up when the app first runs"
            />
            <h3>
                To lookup a movie's info, click the <mark>
                    Lookup movie(s) info
                </mark> button above.
            </h3>
        </div>
    )
}