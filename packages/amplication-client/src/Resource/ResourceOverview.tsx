import { EnumResourceType } from "@amplication/code-gen-types/models";
import {
  CircleBadge,
  EnumFlexDirection,
  EnumPanelStyle,
  EnumTextStyle,
  FlexItem,
  List,
  Panel,
  Text,
} from "@amplication/ui/design-system";
import { useContext } from "react";
import PageContent from "../Layout/PageContent";
import { AppContext } from "../context/appContext";
import DocsTile from "./DocsTile";
import EntitiesTile from "./EntitiesTile";
import FeatureRequestTile from "./FeatureRequestTile";
import RolesTile from "./RolesTile";
import { ServicesTile } from "./ServicesTile";
import SyncWithGithubTile from "./SyncWithGithubTile";
import { TopicsTile } from "./TopicsTile";
import ViewCodeViewTile from "./ViewCodeViewTile";
import { resourceThemeMap } from "./constants";
import PendingChangesNotification from "../VersionControl/PendingChangesNotification";

const PAGE_TITLE = "Resource Overview";

const ResourceOverview = () => {
  const { currentResource } = useContext(AppContext);

  const resourceId = currentResource?.id;

  return (
    <PageContent
      pageTitle={PAGE_TITLE}
      headerContent={<PendingChangesNotification />}
    >
      <Panel panelStyle={EnumPanelStyle.Bold}>
        <FlexItem
          start={
            <CircleBadge
              name={currentResource?.name || ""}
              color={
                resourceThemeMap[currentResource?.resourceType].color ||
                "transparent"
              }
            />
          }
        >
          <FlexItem direction={EnumFlexDirection.Column}>
            <Text textStyle={EnumTextStyle.H3}>{currentResource?.name}</Text>
            <Text textStyle={EnumTextStyle.Subtle}>
              {currentResource?.description}
            </Text>
          </FlexItem>
        </FlexItem>
      </Panel>

      <List>
        <SyncWithGithubTile resourceId={resourceId} />
        {currentResource?.resourceType === EnumResourceType.Service && (
          <>
            <EntitiesTile resourceId={resourceId} />

            <RolesTile resourceId={resourceId} />
          </>
        )}
        {currentResource?.resourceType === EnumResourceType.MessageBroker && (
          <>
            <TopicsTile resourceId={resourceId} />

            <ServicesTile resourceId={resourceId} />
          </>
        )}
        <ViewCodeViewTile resourceId={resourceId} />

        <DocsTile />
        <FeatureRequestTile />
      </List>
    </PageContent>
  );
};

export default ResourceOverview;
