import { Mongo } from 'meteor/mongo';
import { TechnologyDescriptionSchema } from './schema.js';

export const TechnologiesDescriptions = new Mongo.Collection('technologies_descriptions');

TechnologiesDescriptions.attachSchema(TechnologyDescriptionSchema);
TechnologiesDescriptions.attachBehaviour('timestampable');
