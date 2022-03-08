import Script from "next/script";
import Nav from "../components/Nav";
import ProjectProvider from "../context/store-project-context";
import TaskProvider from "../context/store-task-context";
import ProjectGroupProvider from "../context/store-group-context";
import ProfileProvider from "../context/store-profile-context";
import MilestoneProvider from "../context/store-milestone-context";
import LogProvider from "../context/store-log-context";
import DocumentProvider from "../context/store-doc-context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.11.1/dist/js/uikit.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.11.1/dist/js/uikit-icons.min.js"></Script>
      <div className="uk-padding-small" data-uk-grid>
        <Nav></Nav>
        <TaskProvider>
          <ProjectProvider>
            <ProjectGroupProvider>
              <ProfileProvider>
                <MilestoneProvider>
                  <LogProvider>
                    <DocumentProvider>
                      <Component {...pageProps} />
                    </DocumentProvider>
                  </LogProvider>
                </MilestoneProvider>
              </ProfileProvider>
            </ProjectGroupProvider>
          </ProjectProvider>
        </TaskProvider>
      </div>
    </>
  );
}
export default MyApp;
