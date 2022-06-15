import React from "react";
import "../static/css/Sidebar.css";
const Sidebar = () => {
	return (
		<section className="sidebarContainer">
			<aside className="sidebar">

				<nav classNameName="sidebar-nav">

					<ul>
						<li>
							<a href="#"><i className="ion-bag"></i> <span>Shop</span></a>
							<ul classNameName="nav-flyout">

							</ul>
						</li>
						<li>
							<a href="#"><i className="ion-ios-settings"></i> <span className="">Controls</span></a>
							<ul className="nav-flyout">

							</ul>
						</li>

					</ul>
				</nav>
			</aside>
		</section>

	);
};

export default Sidebar;