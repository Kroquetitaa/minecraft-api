# Minecraft API

<table>
<h3>Schema versions</h3>
<p>The schema versions is a schema of the versions of the game an all items of this version.</p>
<tr>
<td ><strong>Key</strong></td>
<td><strong>Type</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr>
<td>version</td>
<td><em>string</em></td>
<td>The version of minecraft</td>
</tr>
<tr>
<td>items</td>
<td><em>array</em></td>
<td>All items of this version</td>
</tr>
</table>

<table>
<h3>Schema items</h3>
<p>The schema items is a schema of the items of game. </p>
<tr>
<td ><strong>Key</strong></td>
<td><strong>Type</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr>
<td>item</td>
<td><em>number</em></td>
<td>The number of item</td>
</tr>
<tr>
<td>minecraftIDName</td>
<td><em>string</em></td>
<td>The minecraftIDName is the name of minecraft item</td>
</tr>
<tr>
<td>minecraftID</td>
<td><em>number</em></td>
<td>The minecraftID is the item ID on game</td>
</tr>
<tr>
<td>minecraftDataValue</td>
<td><em>number</em></td>
<td>The minecraftDataValue is value between <code>0 - 1</code> </td>
</tr>
<tr>
<td>flamableItem</td>
<td><em>boolean</em></td>
<td>The flamableItem is the value of item flamable <code>true - false</code> </td>
</tr>
<tr>
<td>rarityColor</td>
<td><em>object</em></td>
<td>The rarityColor is object made up of values<code>rarityColorSpanish: String, rarityColorEnglish: String</code> </td>
</tr>
<tr>
<td>image</td>
<td><em>string</em></td>
<td>Link to the image on Minecraft Item </td>
</tr>
<tr>
<td>nameItem</td>
<td><em>object</em></td>
<td>The nameItem is object made up of values<code>nameItemSpanish: String, nameItemEnglish: String</code> </br>Are the name of items </td>
</tr>
</table>

<table>
<h3>Schema games</h3>
<p>The schema games is a schema of all games released by minecraft included mode history</p>
<tr>
<td ><strong>Key</strong></td>
<td><strong>Type</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr>
<td>id</td>
<td><em>number</em></td>
<td>The id of game</td>
</tr>
<tr>
<td>game</td>
<td><em>string</em></td>
<td>The game is the name of game</td>
</tr>
<tr>
<td>price</td>
<td><em>number</em></td>
<td>The price is what the game costs. Value between <code>min: 0, max: 100</code></td>
</tr>
<tr>
<td>releaseData</td>
<td><em>string</em></td>
<td>The releaseData is the disponibility of the game </td>
</tr>
<tr>
<td>image</td>
<td><em>string</em></td>
<td>Link to the image of Minecraft game </td>
</tr>
<tr>
<td>titles</td>
<td><em>[string]</em></td>
<td>The titles is a array of titles of the game </td>
</tr>
<tr>
<td>desription</td>
<td><em>string</em></td>
<td>The description of the game </td>
</tr>
</table>

<table>
<h3>Schema characters</h3>
<p>The schema characters is a schema of all characters on game, in the actuality only have two characters are Steve an Alex</p>
<tr>
<td ><strong>Key</strong></td>
<td><strong>Type</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr>
<td>name</td>
<td><em>string</em></td>
<td>The name is the name of the character only two characters <code> Alex - Steve</code></td>
</tr>
<tr>
<td>healthPoints</td>
<td><em>number</em></td>
<td>The healthPoints is the health of the character</td>
</tr>
<tr>
<td>image</td>
<td><em>string</em></td>
<td>Link to the image of character </td>
</tr>
<tr>
<td>attackStrength</td>
<td><em>number</em></td>
<td>The attackStrength is the strength attack of the character</td>
</tr>
<tr>
<td>hitboxSize</td>
<td><em>array of objects</em></td>
<td>The hitboxSize is the distance of hit character. This model is an array of 5 objects made up of mode and hitboxWidth and hitboxHeight and this containt 2 objects in hitboxSpanish, hitboxEnglish. </br><strong>Example:</strong></br><code>hitboxSize: [ { mode: "normal", hitboxWidth:{ hitboxSpanish: "spanish_name", hitboxEnglish: "english_name"}, hitboxHeight:{hitboxSpanish: "spanish_name", hitboxEnglish: "english_name"}}]</code></td>
</tr>

</table>