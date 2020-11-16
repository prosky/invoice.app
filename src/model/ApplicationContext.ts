import React from "react";
import factory from "../data/initialData";
import Application from "../classes/Application";


interface ApplicationProps {
  app: Application
}

const ApplicationContext = React.createContext<ApplicationProps>({
  app: new Application(factory.invoice()),
});

export default ApplicationContext;
