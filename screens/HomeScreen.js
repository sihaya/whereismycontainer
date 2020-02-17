import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as queries from "../src/graphql/queries";
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import awsmobile from "../aws-exports";

API.configure(awsmobile);

const ContainerCard = ({item}) => <View style={styles.card}>
  <Ionicons name="md-arrow-dropright" size={30} color="rgb(32, 68, 128)"
            style={{position: 'absolute', padding: 5, right: 5}}/>
  <View style={{paddingRight: 20}}>
    <Ionicons name="md-boat" size={48} color="rgb(243, 145, 4)"/>
  </View>
  <View>
    <Text style={styles.cardTitleBig}>{item.whereismycontainerId}</Text>
    <Text style={styles.cardTitle}>Pickup</Text>
    <Text>{item.pickup.name}</Text>
    <Text>{item.pickup.address}</Text>


    <Text style={styles.cardTitle}>Delivery</Text>
    <Text>{item.delivery.name}</Text>
    <Text>{item.delivery.address}</Text>
  </View>
</View>;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      container: []
    };

    this.timeout = 0;
  }

  OnChangeText = (text) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState({
      shipperReference: text,
      searching: true
    });

    this.timeout = setTimeout(async () => {
      if (!this.state.shipperReference) {
        this.setState({
          containers: []
        });
        return
      }

      try {
        const response = await API.graphql(graphqlOperation(queries.listContainers, {
          limit: 1000,
          filter: {
            "shipperReference": {
              "eq": this.state.shipperReference
            }
          }
        }));
        const containers = response.data.listContainers.items;
        this.setState({
          containers: containers,
          searching: false
        });


      } catch(e) {
        console.warn(e);
      }
    }, 300);
  };


  render() {


    return (
        <View style={styles.container}>
          <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', margin: 5, padding: 5 }}
              onChangeText={this.OnChangeText}
              value={this.state.shipperReference}
          />
          <FlatList
              ListEmptyComponent={() => {
                return (
                    <View style={{padding: 5}}>
                      {!!this.state.shipperReference && !this.state.searching && <Text>No containers found for {this.state.shipperReference}</Text>}
                      {!this.state.shipperReference && <Text style={{textAlign: 'center'}}>Please enter shipper reference</Text>}
                    </View>);
              }}
              style={styles.container}
              renderItem={ContainerCard} data={this.state.containers} keyExtractor={item => item.id}/>
        </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(228, 228, 228)',
    paddingTop: 5
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: "row",
    margin: 10,
    borderRadius: 8,
    padding: 10,
    marginTop: 0,
    elevation: 3
  },
  cardTitle: {
    marginTop: 15,
    color: 'rgb(47, 89, 140)',
    fontWeight: 'bold'
  },
  cardTitleBig: {
    color: 'rgb(47, 89, 140)',
    fontSize: 15,
    fontWeight: 'bold'
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
