import Script from "next/script";
import Nav from "../components/Nav";
import ProjectProvider, {
  TaskProvider,
  ProjectGroupProvider,
  ProfileProvider,
  MilestoneProvider,
  LogProvider,
  DocumentProvider
} from "../context/store-context";

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
