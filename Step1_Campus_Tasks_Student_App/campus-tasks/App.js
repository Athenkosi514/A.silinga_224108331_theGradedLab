import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import sample from './src/sampleData.json';
import logic from './src/logic.cjs';

const { extractRecords, filterRecords, toggleRecord, countOpen } = logic;

export default function App() {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Local fixture simulates a resolved API response: no network connectivity required.
    const timer = setTimeout(() => { setRecords(extractRecords(sample)); setLoading(false); }, 250);
    return () => clearTimeout(timer);
  }, []);
  const visible = useMemo(() => filterRecords(records, query), [records, query]);
  return <SafeAreaView style={styles.root}>
    <View style={styles.header}><Text style={styles.heading}>Campus Tasks</Text><Text style={styles.subheading}>Debugging experiment · App A</Text></View>
    <View style={styles.summary}><Text style={styles.summaryText}>Open tasks: {countOpen(records)} / {records.length}</Text></View>
    <TextInput accessibilityLabel="Search tasks" placeholder="Search tasks" style={styles.search} value={query} onChangeText={setQuery} />
    {loading ? <ActivityIndicator testID="loading" /> : <ScrollView keyboardShouldPersistTaps="handled">
       {visible.map(item => <View style={styles.card} key={item.id}>
          <Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.status}>Status: {item.status}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel={`Toggle ${item.title}`} style={styles.action} onPress={() => setRecords(prev => toggleRecord(prev, item.id))}><Text style={styles.actionText}>Toggle status</Text></Pressable>
        </View>)}
        {visible.length === 0 && <Text style={styles.empty}>No matching tasks</Text>}
    </ScrollView>}
    <Text style={styles.footer}>Offline sample data · No account required</Text>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
 root: { flex: 1, backgroundColor:'#f4f7fb', padding:20 },
 header: { paddingVertical:14 }, heading: { fontSize:28, fontWeight:'700', color:'#172b4d' }, subheading: {fontSize:13,color:'#56667b',marginTop:5},
 summary: {backgroundColor:'#dfeeff',padding:14,borderRadius:12,marginVertical:10}, summaryText: {fontSize:16,fontWeight:'600',color:'#153c69'},
 search: {backgroundColor:'#fff',borderWidth:1,borderColor:'#ced8e6',borderRadius:10,padding:13,marginBottom:12},
 card: {backgroundColor:'#fff',borderRadius:12,padding:16,marginBottom:10,borderWidth:1,borderColor:'#e0e7f0'},
 itemTitle: {fontSize:17,fontWeight:'600',color:'#172b4d'}, status: {marginTop:5,color:'#586478'},
 action: {backgroundColor:'#1769aa',padding:10,borderRadius:8,alignSelf:'flex-start',marginTop:12}, actionText: {color:'#fff',fontWeight:'600'},
 empty: {color:'#56667b',textAlign:'center',padding:20}, footer: {textAlign:'center',color:'#8190a1',padding:12,fontSize:11}
});
