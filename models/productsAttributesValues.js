/**
Copyright 2017 ToManage

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2017 ToManage SAS
@license   http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
International Registered Trademark & Property of ToManage SAS
*/



"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var AttributesValuesSchema = new Schema({
		code: {
				type: String,
				unique: true
		},
		langs: [{
				_id: false,
				value: String
		}],
		//isremoved: { type: Boolean, default: false },
		sequence: {
				type: Number,
				default: 1
		},
		optionId: {
				type: Schema.Types.ObjectId,
				ref: 'productAttributes',
				require: true
		},
		channels: [{
				_id: false,
				channel: {
						type: Schema.Types.ObjectId,
						ref: 'integrations'
				},
				integrationId: String
		}]
}, {
		toObject: {
				virtuals: true
		},
		toJSON: {
				virtuals: true
		},
		collection: 'ProductAttributesValues'
});

AttributesValuesSchema.virtual('value')
		.get(function() {
				if (this.langs)
						return this.langs[0].value;
		});


exports.Schema = mongoose.model('productAttibutesValues', AttributesValuesSchema);
exports.name = "productAttibutesValues";