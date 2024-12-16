// @flow
import * as React from 'react';
import { action } from '@storybook/addon-actions';

import paperDecorator from '../../../PaperDecorator';
import AssetPackInstallDialog from '../../../../AssetStore/AssetPackInstallDialog';
import {
  fakeAsset1,
  fakePrivateAsset1,
  fakeAssetPacks,
  fakeAssetShortHeader1,
  fakeAssetShortHeader2,
  fakePrivateAssetShortHeader1,
} from '../../../../fixtures/GDevelopServicesTestData';
import { AssetStoreStateProvider } from '../../../../AssetStore/AssetStoreContext';
import { testProject } from '../../../GDevelopJsInitializerDecorator';
import PrivateAssetsAuthorizationContext from '../../../../AssetStore/PrivateAssets/PrivateAssetsAuthorizationContext';
import EventsFunctionsExtensionsContext from '../../../../EventsFunctionsExtensionsLoader/EventsFunctionsExtensionsContext';
import fakeResourceManagementProps from '../../../FakeResourceManagement';
import { useShopNavigation } from '../../../../AssetStore/AssetStoreNavigator';
import { fakeEventsFunctionsExtensionsState } from '../../../FakeEventsFunctionsExtensionsContext';

export default {
  title: 'AssetStore/AssetStore/AssetPackInstallDialog',
  component: AssetPackInstallDialog,
  decorators: [paperDecorator],
};

const mockApiDataForPublicAssets = [
  // Mock a successful response for the first asset:
  {
    url: `https://api-dev.gdevelop.io/asset/asset/${
      fakeAssetShortHeader1.id
    }?environment=live`,
    method: 'GET',
    status: 200,
    response: {
      assetUrl: 'https://resources-fake.gdevelop.io/fake-asset-1',
    },
    delay: 250,
  },
  {
    url: `https://resources-fake.gdevelop.io/fake-asset-1`,
    method: 'GET',
    status: 200,
    response: fakeAsset1,
    delay: 250,
  },

  // Also mock a successful response for the second asset:
  {
    url: `https://api-dev.gdevelop.io/asset/asset/${
      fakeAssetShortHeader2.id
    }?environment=live`,
    method: 'GET',
    status: 200,
    response: {
      assetUrl: 'https://resources-fake.gdevelop.io/fake-asset-1',
    },
    delay: 250,
  },
];

const mockFailedApiDataForPublicAsset1 = [
  {
    url: `https://api-dev.gdevelop.io/asset/asset/${
      fakeAssetShortHeader1.id
    }?environment=live`,
    method: 'GET',
    status: 500,
    response: {
      assetUrl: 'https://resources-fake.gdevelop.io/fake-asset-1',
    },
    delay: 250,
  },
];

const Wrapper = ({ children }: {| children: React.Node |}) => {
  const navigationState = useShopNavigation();
  return (
    <EventsFunctionsExtensionsContext.Provider
      value={fakeEventsFunctionsExtensionsState}
    >
      <AssetStoreStateProvider shopNavigationState={navigationState}>
        {children}
      </AssetStoreStateProvider>
    </EventsFunctionsExtensionsContext.Provider>
  );
};

export const LayoutPublicAssetInstallSuccess = () => (
  <Wrapper>
    <AssetPackInstallDialog
      assetPack={fakeAssetPacks.starterPacks[0]}
      assetShortHeaders={[fakeAssetShortHeader1]}
      addedAssetIds={new Set<string>()}
      onClose={action('onClose')}
      onAssetsAdded={action('onAssetsAdded')}
      project={testProject.project}
      objectsContainer={testProject.testLayout.getObjects()}
      resourceManagementProps={{
        ...fakeResourceManagementProps,
        canInstallPrivateAsset: () => true,
      }}
    />
  </Wrapper>
);
LayoutPublicAssetInstallSuccess.parameters = {
  mockData: mockApiDataForPublicAssets,
};

export const LayoutPublicAssetInstallFailure = () => (
  <Wrapper>
    <AssetPackInstallDialog
      assetPack={fakeAssetPacks.starterPacks[0]}
      assetShortHeaders={[fakeAssetShortHeader1]}
      addedAssetIds={new Set<string>()}
      onClose={action('onClose')}
      onAssetsAdded={action('onAssetsAdded')}
      project={testProject.project}
      objectsContainer={testProject.testLayout.getObjects()}
      resourceManagementProps={{
        ...fakeResourceManagementProps,
        canInstallPrivateAsset: () => true,
      }}
    />
  </Wrapper>
);
LayoutPublicAssetInstallFailure.parameters = {
  mockData: mockFailedApiDataForPublicAsset1,
};

export const LayoutPublicAssetAllAlreadyInstalled = () => (
  <Wrapper>
    <AssetPackInstallDialog
      assetPack={fakeAssetPacks.starterPacks[0]}
      assetShortHeaders={[fakeAssetShortHeader1]}
      addedAssetIds={new Set([fakeAssetShortHeader1.id])}
      onClose={action('onClose')}
      onAssetsAdded={action('onAssetsAdded')}
      project={testProject.project}
      objectsContainer={testProject.testLayout.getObjects()}
      resourceManagementProps={{
        ...fakeResourceManagementProps,
        canInstallPrivateAsset: () => true,
      }}
    />
  </Wrapper>
);

export const LayoutPublicAssetSomeAlreadyInstalled = () => (
  <Wrapper>
    <AssetPackInstallDialog
      assetPack={fakeAssetPacks.starterPacks[0]}
      assetShortHeaders={[fakeAssetShortHeader1, fakeAssetShortHeader2]}
      addedAssetIds={new Set([fakeAssetShortHeader1.id])}
      onClose={action('onClose')}
      onAssetsAdded={action('onAssetsAdded')}
      project={testProject.project}
      objectsContainer={testProject.testLayout.getObjects()}
      resourceManagementProps={{
        ...fakeResourceManagementProps,
        canInstallPrivateAsset: () => true,
      }}
    />
  </Wrapper>
);
LayoutPublicAssetSomeAlreadyInstalled.parameters = {
  mockData: mockApiDataForPublicAssets,
};

export const LayoutPrivateAssetInstallSuccess = () => {
  const navigationState = useShopNavigation();

  return (
    <PrivateAssetsAuthorizationContext.Provider
      value={{
        authorizationToken: null,
        updateAuthorizationToken: async () => {},
        fetchPrivateAsset: async () => fakePrivateAsset1,
        installPrivateAsset: async () => ({
          // Mock a successful installation
          createdObjects: [],
        }),
        getPrivateAssetPackAudioArchiveUrl: async () =>
          'https://resources.gevelop.io/path/to/audio/archive',
      }}
    >
      <AssetStoreStateProvider shopNavigationState={navigationState}>
        <AssetPackInstallDialog
          assetPack={fakeAssetPacks.starterPacks[0]}
          assetShortHeaders={[fakePrivateAssetShortHeader1]}
          addedAssetIds={new Set<string>()}
          onClose={action('onClose')}
          onAssetsAdded={action('onAssetsAdded')}
          project={testProject.project}
          objectsContainer={testProject.testLayout.getObjects()}
          resourceManagementProps={{
            ...fakeResourceManagementProps,
            canInstallPrivateAsset: () => true,
          }}
        />
      </AssetStoreStateProvider>
    </PrivateAssetsAuthorizationContext.Provider>
  );
};

export const LayoutPrivateAssetInstallFailure = () => {
  const navigationState = useShopNavigation();

  return (
    <PrivateAssetsAuthorizationContext.Provider
      value={{
        authorizationToken: null,
        updateAuthorizationToken: async () => {},
        fetchPrivateAsset: async () => fakePrivateAsset1,
        // Mock an error
        installPrivateAsset: async () => {
          throw new Error('Fake error during installation of a private asset.');
        },
        getPrivateAssetPackAudioArchiveUrl: async () =>
          'https://resources.gevelop.io/path/to/audio/archive',
      }}
    >
      <AssetStoreStateProvider shopNavigationState={navigationState}>
        <AssetPackInstallDialog
          assetPack={fakeAssetPacks.starterPacks[0]}
          assetShortHeaders={[fakePrivateAssetShortHeader1]}
          addedAssetIds={new Set<string>()}
          onClose={action('onClose')}
          onAssetsAdded={action('onAssetsAdded')}
          project={testProject.project}
          objectsContainer={testProject.testLayout.getObjects()}
          resourceManagementProps={{
            ...fakeResourceManagementProps,
            canInstallPrivateAsset: () => true,
          }}
        />
      </AssetStoreStateProvider>
    </PrivateAssetsAuthorizationContext.Provider>
  );
};

export const LayoutPrivateAssetButCantInstall = () => (
  <Wrapper>
    <AssetPackInstallDialog
      assetPack={fakeAssetPacks.starterPacks[0]}
      assetShortHeaders={[fakePrivateAssetShortHeader1]}
      addedAssetIds={new Set<string>()}
      onClose={action('onClose')}
      onAssetsAdded={action('onAssetsAdded')}
      project={testProject.project}
      objectsContainer={testProject.testLayout.getObjects()}
      resourceManagementProps={fakeResourceManagementProps}
    />
  </Wrapper>
);

export const LayoutPrivateAssetButInstallingTooMany = () => (
  <Wrapper>
    <AssetPackInstallDialog
      assetPack={fakeAssetPacks.starterPacks[0]}
      assetShortHeaders={Array.from(
        { length: 120 },
        (_, index) => fakePrivateAssetShortHeader1
      )}
      addedAssetIds={new Set<string>()}
      onClose={action('onClose')}
      onAssetsAdded={action('onAssetsAdded')}
      project={testProject.project}
      objectsContainer={testProject.testLayout.getObjects()}
      resourceManagementProps={{
        ...fakeResourceManagementProps,
        canInstallPrivateAsset: () => true,
      }}
    />
  </Wrapper>
);

export const NoObjectsContainerPublicAssetInstallSuccess = () => (
  <Wrapper>
    <AssetPackInstallDialog
      assetPack={fakeAssetPacks.starterPacks[0]}
      assetShortHeaders={[fakeAssetShortHeader1, fakeAssetShortHeader2]}
      addedAssetIds={new Set<string>()}
      onClose={action('onClose')}
      onAssetsAdded={action('onAssetsAdded')}
      project={testProject.project}
      objectsContainer={null}
      resourceManagementProps={{
        ...fakeResourceManagementProps,
        canInstallPrivateAsset: () => true,
      }}
    />
  </Wrapper>
);
NoObjectsContainerPublicAssetInstallSuccess.parameters = {
  mockData: mockApiDataForPublicAssets,
};

export const NoObjectsContainerPrivateAssetButCantInstall = () => (
  <Wrapper>
    <AssetPackInstallDialog
      assetPack={fakeAssetPacks.starterPacks[0]}
      assetShortHeaders={[fakePrivateAssetShortHeader1]}
      addedAssetIds={new Set<string>()}
      onClose={action('onClose')}
      onAssetsAdded={action('onAssetsAdded')}
      project={testProject.project}
      objectsContainer={null}
      resourceManagementProps={fakeResourceManagementProps}
    />
  </Wrapper>
);
